def dockerhub = "abiwardani/jenkins-ui"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    stages {
        stage("Install Dependecies") {
            steps {
                nodejs("node14") {
                    sh 'npm install'
                }
            }
        }
        stage("Build Docker Image") {
            steps {
                script {
                    builder = docker.build("${dockerhub}:${BRANCH_NAME}")
                }
            }
        }
        stage("Testing") {
            steps {
                script {
                    builder.inside {
                        sh 'echo testing berhasil'
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