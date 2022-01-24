const db = {
    News: {
        destroy: (where) => {
            const {where: id} = where
            if (id==='80'){
              return undefined
            }
            const msg = 'New deleted'
            console.log(msg)
            return msg
        }
      },
      Testimonials: {
        create: (data) =>{
            const msg = 'Testimonial created'
            console.log(msg)
            return msg
        }
      }
}
module.exports = db;