import development from './development'
import production from './production'

const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return development

    case 'production':
      return production

    default:
      return development
  }
}

export default getConfig()
