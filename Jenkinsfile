def dockerhub = "abiwardani/jenkins-ui"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    parameters {
        booleanParam(name: 'Run', defaultValue: false, description: 'Run service')
        choice(name: 'DEPLOY', choices: ['deployment', 'production'], description: 'Choose Branch')
    }

    stages {
        stage("Install Dependencies"){
            steps {
                 nodejs("node14") {
                    sh 'npm install'
                }
            }
        }
        stage("Testing branch master"){
            when {
                expression {
                    params.DEPLOY == 'deployment' || BRANCH_NAME == 'master'
                }
            }
            steps {
                sh "testing branch ${BRANCH_NAME} success"
            }
        }   
        stage("Testing branch production"){
            when {
                expression {
                    params.DEPLOY == 'production' || BRANCH_NAME == 'production'
                }
            }
            steps {
                sh "testing branch ${BRANCH_NAME} success"
            }
        }   
        stage("Image master"){
            when {
                expression {
                    params.DEPLOY == 'deployment' || BRANCH_NAME == 'master'
                }
            }
            steps {
                script {
                    builder.inside {
                        sh "Image branch ${BRANCH_NAME} is running"
                    }
                }
            }
        }   
        stage("Image production"){
            when {
                expression {
                    params.DEPLOY == 'production' || BRANCH_NAME == 'production'
                }
            }
            steps {
                script {
                    builder.inside {
                        sh "Image branch ${BRANCH_NAME} is running"
                    }
                }
            }
        }   
        stage("Deploy Docker Compose Deployment") {
            when {
                expression {
                    params.DEPLOY == 'deployment' || BRANCH_NAME == 'master'
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'devserver',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yml',
                                        remoteDirectory: 'app',
                                        execCommand: "docker pull ${dockerhub}:${BRANCH_NAME}; cd ./app/app; docker-compose stop; docker-compose up -d --force-recreate",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }        
            }
        }     
        stage("Deploy Docker Compose Production") {
            when {
                expression {
                    params.DEPLOY == 'production' || BRANCH_NAME == 'production'
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'devserver',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yml',
                                        remoteDirectory: 'app',
                                        execCommand: "docker pull ${dockerhub}:${BRANCH_NAME}; cd ./app/app; docker-compose stop; docker-compose up -d --force-recreate",
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