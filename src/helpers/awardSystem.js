
module.exports = {
    awards: (amounts) => {
        let award;
        console.log(amounts)
        switch (true) {
            case (amounts >= 5000):
                award = 'gold'
                break;
            case (amounts >= 1000):
                award = 'silver'
                break;
            case (amounts >= 300):
                award = 'bronce'
                break;
            case (amounts >= 1):
                award = 'noobie'
                break;
            default:
                award = 'selfish'
                break;
        }

        return  award
    }
}