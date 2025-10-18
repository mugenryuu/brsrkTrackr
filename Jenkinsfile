pipeline {
    agent any

    environment {
        SONARQUBE_ENV = 'SonarQube'
    }

    tools {
            nodejs 'NodeJs'
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
            }
        }

        stage('SonarQube Analysis') {
            steps {
                /* groovylint-disable-next-line DuplicateStringLiteral */
                withSonarQubeEnv('SonarQube') {
                    script {
                        def scannerHome = tool 'sonar-scanner'
                        sh "${scannerHome}/bin/sonar-scanner " +
                           '-Dsonar.projectKey=brsrkTracker ' +
                           '-Dsonar.sources=. ' +
                           '-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info'
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    echo '🔹 Waiting for SonarQube Quality Gate result...'
                    waitForQualityGate abortPipeline: false
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
