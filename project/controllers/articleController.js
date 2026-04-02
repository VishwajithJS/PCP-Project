const Article = require("../models/Article")

exports.createArticle = async (req,res)=>{
try{
const {title,content} = req.body

const article = new Article({
title,
content,
author:req.user.id
})

await article.save()
res.status(201).json(article)

}catch(err){
res.status(500).json({error:err.message})
}
}

exports.getPendingArticles = async (req,res)=>{
try{
const articles = await Article.find({status:"PENDING"})
res.json(articles)
}catch(err){
res.status(500).json({error:err.message})
}
}

exports.approveArticle = async (req,res)=>{
try{
const article = await Article.findByIdAndUpdate(
req.params.id,
{status:"APPROVED"},
{new:true}
)
res.json(article)
}catch(err){
res.status(500).json({error:err.message})
}
}

exports.rejectArticle = async (req,res)=>{
try{
const article = await Article.findByIdAndUpdate(
req.params.id,
{status:"REJECTED"},
{new:true}
)
res.json(article)
}catch(err){
res.status(500).json({error:err.message})
}
}

exports.getPublishedArticles = async (req,res)=>{
try{
const articles = await Article.find({status:"APPROVED"})
res.json(articles)
}catch(err){
res.status(500).json({error:err.message})
}
}