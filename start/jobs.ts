import TesteJob from '../app/jobs/teste.js'

const jobs: Record<string, Function> = {
  [TesteJob.name]: () => import('../app/jobs/teste.js'),
}

export { jobs }
