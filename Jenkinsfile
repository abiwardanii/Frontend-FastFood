def dockerhub = "abiwardani/jenkins-API"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: 'false', description: 'Check Docker image')
        choice(name: 'DEPLOY', choices: ["master", "production"], description: 'Choose Branch')
    }

    environment {
        branch = "production"
    }

    stages {
        stage("Install Dependecies") {
            steps {
                echo 'installing'
            }
        }
        stage("Build Docker Image master") {
            when {
                expression {
                    params.DEPLOY == "master"
                }
            }
            steps {
                echo 'master run'
            }
        }
        stage("Build Docker Image production") {
            when {
                expression {
                    params.DEPLOY == "production"
                }
            }
            steps {
                echo 'build docker image'
            }
        }
        stage("Testing") {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                echo 'run testing'
            }
        }        
        stage("Push Docker Image") {
            steps {
                echo 'push docker image'
            }
        }        
    }
}