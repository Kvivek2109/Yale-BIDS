const express = require('express');
const router = express.Router();

router.get('/:taskId', async function(req, res, next) {
    const taskId = req.params.taskId;
    try {
        const fetchData = await fetchDataFunction(taskId);
        res.json(fetchData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
});

async function fetchDataFunction(taskId) {
    const mockData = {
        taskId: taskId,
        data: 'Some mock data corresponding to the task ID',
    };
    return mockData;
}

module.exports = router;
