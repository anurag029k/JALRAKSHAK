// Water Health Score Calculation
// Formula: Health Score = 100 - Pollution Penalty

function calculateHealthScore(qualityData) {
  const temperature = qualityData.temperature ?? 25;
  const doSat = calculateDOSaturation(temperature);
  const standards = {
    ph: { Sn: 8.5, Vi: 7.0 },
    do: { Sn: 5.0, Vi: doSat },
    bod: { Sn: 3.0, Vi: 0.0 },
    totalColiform: { Sn: 500, Vi: 0.0 }
  };

  // Calculate proportionality constant K
  const K =
    1 /
    (
      (1 / standards.ph.Sn) +
      (1 / standards.do.Sn) +
      (1 / standards.bod.Sn) +
      (1 / standards.totalColiform.Sn)
    );

  // Unit Weights
  const Wph = K / standards.ph.Sn;
  const Wdo = K / standards.do.Sn;
  const Wbod = K / standards.bod.Sn;
  const Wtc = K / standards.totalColiform.Sn;

  // Quality Ratings

  // pH
  const qPh =
    100 *
    (Math.abs(qualityData.ph - standards.ph.Vi) /
      (standards.ph.Sn - standards.ph.Vi));

  // DO (higher is better)
  const qDo =
    100 *
    ((standards.do.Vi - qualityData.do) /
      (standards.do.Vi - standards.do.Sn));

  // BOD
  const qBod =
    100 *
    (qualityData.bod /
      standards.bod.Sn);

  // Fecal Coliform
  const qTc =
    100 *
    (qualityData.totalColiform /
      standards.totalColiform.Sn);

  // Weighted Arithmetic WQI
  const numerator =
    (qPh * Wph) +
    (qDo * Wdo) +
    (qBod * Wbod) +
    (qTc * Wtc);

  const denominator =
    Wph + Wdo + Wbod + Wtc;

  const wqi = numerator / denominator;
  const healthScore = convertWQIToHealthScore(wqi);

  return Math.round(healthScore);
}
function convertWQIToHealthScore(wqi) {
  return Math.max(
    0,
    Math.min(
      100,
      100 - wqi
    )
  );
}

function calculateDOSaturation(tempC = 25) {
  return (
    14.621 -
    (0.41022 * tempC) +
    (0.00799 * tempC * tempC) -
    (0.0000774 * tempC * tempC * tempC)
  );
}

function getStatusFromHealthScore(healthScore = 0) {
  if (healthScore >= 75) return 'excellent';
  if (healthScore >= 50) return 'good';
  if (healthScore >= 25) return 'moderate';
  if (healthScore > 0) return 'poor';
  return 'critical';
}

// Check alert thresholds
function checkAlertThresholds(waterBody, qualityData) {
  const alerts = [];

  // Pollution Alert: BOD > 3
  if (qualityData.bod > 3) {
    alerts.push({
      waterBodyId: waterBody._id,
      waterBodyName: waterBody.name,
      type: 'pollution',
      severity: qualityData.bod > 6 ? 'critical' : 'high',
      message: `High BOD level detected: ${qualityData.bod} mg/L`,
      parameters: { bod: qualityData.bod }
    });
  }

  // Low Oxygen Alert: DO < 5
  if (qualityData.do < 5) {
    alerts.push({
      waterBodyId: waterBody._id,
      waterBodyName: waterBody.name,
      type: 'low_oxygen',
      severity: qualityData.do < 3 ? 'critical' : 'high',
      message: `Low dissolved oxygen detected: ${qualityData.do} mg/L`,
      parameters: { do: qualityData.do }
    });
  }

  // Contamination Alert: Fecal Coliform > 2500
  if (qualityData.totalColiform > 500) {
    alerts.push({
      waterBodyId: waterBody._id,
      waterBodyName: waterBody.name,
      type: 'contamination',
      severity:
        qualityData.totalColiform > 5000
          ? 'critical'
          : 'high',
      message: `High total coliform (${qualityData.totalColiform} MPN/100mL)`,
      parameters: {
        totalColiform:
          qualityData.totalColiform
      }
    });
  }
  // pH Alert
  if (qualityData.ph < 6 || qualityData.ph > 9) {
    alerts.push({
      waterBodyId: waterBody._id,
      waterBodyName: waterBody.name,
      type: 'pollution',
      severity: 'medium',
      message: `Abnormal pH level detected: ${qualityData.ph}`,
      parameters: { ph: qualityData.ph }
    });
  }
  // Health Score Alert
  // if (healthScore < 20) {
  //   alerts.push({
  //     waterBodyId: waterBody._id,
  //     waterBodyName: waterBody.name,
  //     type: 'health_score',
  //     severity: 'critical',
  //     message: `Critical water health score (${healthScore}/100)`
  //   });
  // } else if (healthScore < 40) {
  //   alerts.push({
  //     waterBodyId: waterBody._id,
  //     waterBodyName: waterBody.name,
  //     type: 'health_score',
  //     severity: 'high',
  //     message: `Poor water health score (${healthScore}/100)`
  //   });
  // }
  return alerts;
}

module.exports = {
  calculateHealthScore,
  getStatusFromHealthScore,
  checkAlertThresholds
};
