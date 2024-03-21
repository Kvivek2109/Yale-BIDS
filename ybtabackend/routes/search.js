var express = require('express');
const axios = require('axios');
var router = express.Router();

router.get('/', async function (req, res, next) {
    const term = req.query.term;
    console.log('Received request with term:', term);
    if (term) {
        try {
            const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&usehistory=y&retmode=json&term=${term}`);
            const records = parseInt(response.data.esearchresult.count);
            const query = response.data.esearchresult.translationset[0].from;
            const task_id = response.data.esearchresult.webenv.replace("MCID_", "");
            const formattedJson = {
                "records": records,
                "query": query,
                "task_id": task_id
            };
            res.json(formattedJson);
        } catch (error) {
            console.error('Error fetching data from NCBI API:', error);
            res.status(500).json({error: 'Failed to fetch data from NCBI API'});
        }
    } else {
        res.status(400).send('Missing search term');
    }
});

module.exports = router;
