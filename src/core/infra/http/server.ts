import app from '@core/infra/http/app'

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.HTTP_PORT}`)
})
