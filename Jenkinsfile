pipeline {
    agent any

    environment {
        // Replace with your SonarQube server name as configured in Jenkins
        SONARQUBE_ENV = 'SonarQubeServer'

        // Optional: your Node version if using nvm
        // PATH = "$HOME/.nvm/versions/node/v18.17.0/bin:$PATH"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '🔹 Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '🔹 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🔹 Running Jest tests...'
                sh 'npm test -- --coverage'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo '🔹 Running SonarQube analysis...'
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    echo '🔹 Waiting for SonarQube Quality Gate result...'
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and SonarQube analysis completed successfully!'
        }
        failure {
            echo '❌ Build failed! Check logs above.'
        }
    }
}
