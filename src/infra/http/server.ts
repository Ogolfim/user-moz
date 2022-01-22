import app from './app'

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.HTTP_PORT}`)
})
