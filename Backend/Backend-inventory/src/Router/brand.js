const express = require('express')
const Brand = require('../models/brand')
const router = new express.Router()



router.post('/create/brand' , async (req , res)=>{
    const brand = new  Brand(req.body)
    try{
        await brand.save()
        res.status(201).send(brand)
    } catch (e) {
        res.status(401).send(e)
    }

})
router.patch('/brand/update' , async (req , res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates=['brandName']
    const isValidOperations= updates.every((update)=> allowedUpdates.includes(update))

    if (!isValidOperations){
        res.status(400).send({Error : 'invalid updates'})
    }

    try{
        // const user = await User.findByIdAndUpdate(_id )
        updates.forEach((update)=> req.brand[update] = req.body[update])
        await req.brand.save()
        res.send(req.brand)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/delete/brand' , async (req , res)=>{
    try{
        await req.brand.remove()
        // console.log(req.brand)
        res.send(req.brand)
    } catch(e){
        res.status(500).send(e)
    }
})













// router.post('/users/signin',  async (req , res)=>{
//     try{
//         const user = await User.findByCredentials(req.body.email , req.body.password)
//         console.log(user)
//         const token = await user.generateAuthToken()
//         res.status(201).send({user , token})
//     } catch(e){
//         console.log(e)
//         res.status(400).send(e)
//     }
// })


// router.post('/user/logout'  , async (req , res)=>{
//     try{
//         req.user.tokens = req.user.tokens.filter((token)=>{
//             return token.token !== req.token
//         })
//         await req.user.save()
//         res.send()
//     } catch(e){
//         res.status(500).send()
//     }
// })

// router.get('/user/read' , auth , async (req , res)=>{
//     res.send(req.user)
// })




module.exports= router