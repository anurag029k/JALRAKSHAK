# JalRakshak AI Module

Python FastAPI service for AI-powered water pollution detection from images.

## Features

- Image analysis for pollution detection
- Batch image processing
- Water quality assessment from visual data
- Detection of:
  - Water hyacinth
  - Murky/turbid water
  - Foam pollution
  - Garbage/debris
  - Sewage indicators

## Installation

```bash
pip install -r requirements.txt
```

## Running

```bash
# Development
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Endpoints

### POST /analyze
Analyze a single image for pollution detection.

**Request:** multipart/form-data with file
**Response:** Analysis results with detected pollutants and confidence scores

### POST /batch-analyze
Analyze multiple images in batch.

**Request:** multipart/form-data with multiple files
**Response:** Array of analysis results

## Model Training

To train a custom YOLOv11 model:

1. Prepare dataset in YOLO format
2. Install ultralytics: `pip install ultralytics`
3. Train: `yolo detect train data=dataset.yaml model=yolov11n.pt epochs=100`
4. Export best model to `models/best.pt`

## Current Implementation

Currently uses color-based analysis as a placeholder. For production:
- Train YOLOv11 model on water pollution dataset
- Replace placeholder with actual model inference
- Add more sophisticated detection algorithms
