from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import cv2
import numpy as np
from PIL import Image
import io

load_dotenv()

app = FastAPI(title="JalRakshak AI Module", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class DetectionResult(BaseModel):
    label: str
    confidence: float
    bbox: List[float]

class AnalysisResponse(BaseModel):
    success: bool
    detected_pollutants: List[DetectionResult]
    overall_pollution_level: str
    image_url: Optional[str] = None

# Initialize YOLO model (placeholder - would load actual model in production)
model = None

def load_model():
    """Load the YOLO model for pollution detection"""
    global model
    try:
        # In production, load actual YOLOv11 model
        # model = YOLO('best.pt')
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error loading model: {e}")

@app.on_event("startup")
async def startup_event():
    load_model()

@app.get("/")
async def root():
    return {
        "message": "JalRakshak AI Module - Water Pollution Detection",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_image(file: UploadFile = File(...)):
    """
    Analyze uploaded water body image for pollution detection
    """
    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        image_np = np.array(image)
        
        # Convert to OpenCV format
        image_cv = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
        
        # Placeholder for actual YOLO inference
        # In production, use: results = model(image_cv)
        
        # Simulated detection results for demo
        detected_pollutants = []
        
        # Simple color-based analysis (placeholder)
        # Analyze water color for pollution indicators
        hsv = cv2.cvtColor(image_cv, cv2.COLOR_BGR2HSV)
        
        # Detect green (algae/water hyacinth)
        lower_green = np.array([35, 40, 40])
        upper_green = np.array([85, 255, 255])
        green_mask = cv2.inRange(hsv, lower_green, upper_green)
        green_ratio = np.sum(green_mask) / (image_cv.shape[0] * image_cv.shape[1] * 255)
        
        if green_ratio > 0.1:
            detected_pollutants.append({
                "label": "water_hyacinth",
                "confidence": min(0.95, green_ratio * 5),
                "bbox": [0, 0, image_cv.shape[1], image_cv.shape[0]]
            })
        
        # Detect brown/murky water (pollution)
        lower_brown = np.array([8, 50, 50])
        upper_brown = np.array([20, 255, 255])
        brown_mask = cv2.inRange(hsv, lower_brown, upper_brown)
        brown_ratio = np.sum(brown_mask) / (image_cv.shape[0] * image_cv.shape[1] * 255)
        
        if brown_ratio > 0.15:
            detected_pollutants.append({
                "label": "murky_water",
                "confidence": min(0.90, brown_ratio * 4),
                "bbox": [0, 0, image_cv.shape[1], image_cv.shape[0]]
            })
        
        # Detect white foam (sewage/pollution)
        lower_white = np.array([0, 0, 200])
        upper_white = np.array([180, 30, 255])
        white_mask = cv2.inRange(hsv, lower_white, upper_white)
        white_ratio = np.sum(white_mask) / (image_cv.shape[0] * image_cv.shape[1] * 255)
        
        if white_ratio > 0.05:
            detected_pollutants.append({
                "label": "foam_pollution",
                "confidence": min(0.85, white_ratio * 8),
                "bbox": [0, 0, image_cv.shape[1], image_cv.shape[0]]
            })
        
        # Calculate overall pollution level
        total_confidence = sum(p["confidence"] for p in detected_pollutants)
        
        if total_confidence > 0.7:
            overall_level = "high"
        elif total_confidence > 0.4:
            overall_level = "medium"
        elif total_confidence > 0.1:
            overall_level = "low"
        else:
            overall_level = "none"
        
        return AnalysisResponse(
            success=True,
            detected_pollutants=detected_pollutants,
            overall_pollution_level=overall_level
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/batch-analyze")
async def batch_analyze(files: List[UploadFile] = File(...)):
    """
    Analyze multiple images in batch
    """
    results = []
    for file in files:
        try:
            result = await analyze_image(file)
            results.append({
                "filename": file.filename,
                "analysis": result
            })
        except Exception as e:
            results.append({
                "filename": file.filename,
                "error": str(e)
            })
    
    return {"success": True, "results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
