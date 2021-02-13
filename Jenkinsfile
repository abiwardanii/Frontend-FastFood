def dockerhub = "abiwardani/jenkins-api"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: 'false', description: 'Testing image')
        choice(name: 'DEPLOY', choices: ['yes', 'no'], description: 'Deployment')
    }

    stages {
        stage("Install Dependencies")  {
            when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                nodejs("node14") {
                    sh 'npm install'
                }
            }
        }
        stage("Build Docker Image")  {
            when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                script {
                    builder = docker.build(image_name, "--no-cache .") 
                }
            }
        } 
        stage("Testing Image")  {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script {
                    builder.inside {
                        sh 'echo Testing Success'
                    }
                }
            }
        }
        stage("Push Image")  {
            when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                script {
                    builder.push()
                }
            }
        } 
        stage("Deploy") {
             when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'fastfood-dev',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yml',
                                        execCommand: "docker pull ${dockerhub}:${BRANCH_NAME}; cd /home/abi/fastfood; docker-compose stop; docker-compose up -d --force-recreate",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }        
            }
        }     
   
    }
}