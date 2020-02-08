const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

// Get All Users
router.get('/', (req,res) => {
    User.find({},(err,data)=>{
        if(err) throw err 
        res.json(data)
    })
})

// Get User by ID
router.get('/:id', (req,res) => {
    User.findOne({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

// Get User by Fingerprint
router.get('/fingerprint/:id', (req,res) => {
    User.findOne({fingerprint_id:req.params.id}).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

// Add New User
router.post('/', urlEncoded,(req,res) => {
    var user = new User({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        phone:  req.body.phone,
        email: req.body.email,
        password: req.body.password
    })
    
    user.save( (err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json({msg:"User Added"})
    })
})

// Add Fingerprint ID
router.put('/:id/fingerprintid', urlEncoded, (req,res) => {
    User.updateOne({_id: req.params.id}, {
        fingerprint_id: req.body.fingerprint_id
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Fingerprint Added"}])
    })
})

// Add PZW Points
router.put('/:id/pzwpoints', urlEncoded, (req,res) => {
    User.updateOne({_id: req.params.id}, {
        pzwpoints: req.body.pzwpoints
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"PZW Points Added"}])
    })
})

// Update User by ID
router.put('/:id', urlEncoded, (req,res) => {
    User.updateOne({_id: req.params.id}, {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        phone:  req.body.phone,
        email: req.body.email,
    },(err) => {
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"User Updated"}])
    })
})

// Delete User
router.delete('/:id', (req, res) => {
    User.deleteOne({_id: req.params.id}, (err) => {
        if(err) res.json({msg: "Invalid Request"})
        res.json({msg: "User Deleted"})
    })
})

module.exports = router