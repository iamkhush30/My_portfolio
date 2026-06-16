pipeline {
    agent any

    environment {
        NEXUS_URL = 'nexus:8082'
        IMAGE_NAME = 'portfolio'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Clone') {
            steps {
                echo 'Code already cloned by Jenkins'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Tag Image') {
            steps {
                sh 'docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${NEXUS_URL}/${IMAGE_NAME}:${IMAGE_TAG}'
            }
        }

        stage('Push to Nexus') {
            steps {
                sh 'docker push ${NEXUS_URL}/${IMAGE_NAME}:${IMAGE_TAG}'
            }
        }
    }
}

