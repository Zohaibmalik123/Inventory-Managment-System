const express = require('express')
const Category = require('../Model/category')
const router = new express.Router()
const auth = require('../middleware/authuser')
const Brand = require("../Model/brand");


router.post('/create/category', auth ,async (req , res)=>{
    const category = new  Category(req.body)
    try{
        await category.save()
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send(e)
    }

})
router.get('/get-category'  , async (req , res)=>{
    try{
        const category = await Category.find({})
        res.send(category)
    } catch (e) {
        res.status(500).send(e)
    }
})
// router.patch('/update/category' , auth , async (req , res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates=['Id' , 'Brand_name']
//     const isValidOperations= updates.every((updates)=> allowedUpdates.includes(updates))

//     if (!isValidOperations){
//         res.status(400).send({Error : 'invalid updates'})
//     }

//     try{
//         // const user = await User.findByIdAndUpdate(_id )
//         updates.forEach((update)=> req.category[update] = req.body[update])
//         await req.category.save()
//         res.send(req.category)
//     } catch(e){
//         res.status(400).send(e)
//     }
// })

// router.delete('/delete/category' ,auth , async (req , res)=>{
//     try{
//         await req.category.remove()
//         console.log(req.category)
//         res.send(req.category)
//     } catch(e){
//         res.status(500).send(e)
//     }
// })













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