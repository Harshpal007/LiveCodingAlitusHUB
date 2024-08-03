exports.uploadImage = (req, res) => {
    if(!req.file){
        return res.status(400).send('No File uploaded');
    }
    
    res.staus(200).send({
        message: 'File uploaded!!',
        file: req.file
    })
}