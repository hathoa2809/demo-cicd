const calculateStatus = (score) => {
    const numericScore = parseFloat(score);

    if (isNaN(numericScore)) return 'UNKNOWN'; 

    return numericScore >= 5 ? 'PASSED' : 'FAILED';
};

module.exports = { calculateStatus };
