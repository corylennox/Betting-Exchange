const betSubmissionService = require('../service/betSubmission');

class BetSubmissionController {
    async createBetSubmission(req, res) {
        try {
            const id = await betSubmissionService.createBetSubmission(req.body);
            res.status(201).json(id);
        } catch (err) {
            console.error(err);
            res.status(500).json('something went wrong');
        }
    }
}

module.exports = new BetSubmissionController();
