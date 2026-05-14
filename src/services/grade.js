const calculateStatus = (score) => {
    const numericScore = parseFloat(score);

    if (isNaN(numericScore)) return 'UN-KNOWN'; 

    return numericScore >= 5 ? 'PASSED' : 'FAILED';
};

module.exports = { calculateStatus };
