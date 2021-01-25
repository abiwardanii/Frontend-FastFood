def dockerhub = "abiwardani/jenkins-API"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: 'false', description: 'Check Docker image')
        choice(name: 'DEPLOY', choices: ["master", "production"], description: 'Branch')
    }

    environment {
        branch = "production"
    }

    stages {
        stage("Install Dependecies") {
            steps {
               nodejs("node14") {
                   sh 'npm install'
               }
            }
        }
        stage("Build Docker Image master") {
            when {
                expression {
                    params.DEPLOY == "master"
                }
            }
            steps {
                script {
                    builder = docker.build("${image_name}")
                }
            }
        }
        stage("Build Docker Image production") {
            when {
                expression {
                    params.DEPLOY == "production"
                }
            }
            steps {
                script {
                    builder = docker.build("${dockerhub}:${env.branch}")
                }
            }
        }
        stage("Testing") {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                 script {
                     builder.inside {
                         echo "Success Testing Image"
                     }
                 }
            }
        }        
        stage("Push Docker Image") {
            steps {
                script {
                     builder.push()
                 }
            }
        }        
    }
}