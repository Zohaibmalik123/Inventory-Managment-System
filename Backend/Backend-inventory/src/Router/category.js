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
router.get('/get-category/:id'  , async (req , res)=>{
    const _id = req.params.id

    try{
        const category = await Category.findById(_id)
        res.send(category)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/category/update/:id'  ,async (req , res)=>{
    try{
        const _id = req.params.id;
        // console.log(req.body);
        // console.log(_id)
        const updateCategory = await Category.findByIdAndUpdate( _id , req.body)
        res.send(updateCategory)
    } catch(e){
        res.status(400).send(e)
    }
})

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