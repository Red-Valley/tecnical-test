import Boom from '@hapi/boom'

export default function notFoundHandler(req,res,next){
    next(Boom.notFound())
}