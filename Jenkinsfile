def dockerhub = "abiwardani/jenkins-ui"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    stages {
        stage("Install Dependencies"){
            steps {
                 nodejs("node14") {
                    sh 'npm install'
                }
            }
        }
        // stage("Build Docker Image"){
        //     steps {
        //         script {
        //             builder = docker.build("${image_name}")
        //         }   
        //     }
        // }     
        stage("Testing Docker Image"){
            steps {
                script {
                    builder.inside {
                        sh "testing success"
                    }
                }   
            }
        } 
        stage("Push Docker image")  {
            steps {
                script {
                    builder.push()
                }
            }
        }    
        // stage("Deploy Docker Compose Deployment") {
        //     steps {
        //         script {
        //             sshPublisher(
        //                 publishers: [
        //                     sshPublisherDesc(
        //                         configName: 'devserver',
        //                         verbose: false,
        //                         transfers: [
        //                             sshTransfer(
        //                                 sourceFiles: 'docker-compose.yml',
        //                                 remoteDirectory: 'app',
        //                                 execCommand: "docker pull ${dockerhub}:${BRANCH_NAME}; cd ./app/app; docker-compose stop; docker-compose up -d --force-recreate",
        //                                 execTimeout: 120000,
        //                             )
        //                         ]
        //                     )
        //                 ]
        //             )
        //         }        
        //     }
        // }     
  
    }
}