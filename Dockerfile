# ---- Build stage ----
FROM maven:3.8.7-eclipse-temurin-8 AS build
WORKDIR /app

# Bring the Maven project in first to leverage Docker layer caching
COPY pom.xml ./
# Pre-fetch plugins/deps (optional but speeds up builds)
RUN mvn -B -DskipTests dependency:go-offline

# Bring the rest of the source
COPY src ./src
COPY src/main/webapp/static ./src/main/webapp/static

# Node & tooling needed by the Grunt/Bower flow that Maven triggers
# (Spring Boot 1.3 era stack works well with Node 14 LTS; Java 8 runtime)
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs git
RUN npm install -g grunt-cli bower
RUN mvn -B -DskipTests package

# ---- Runtime stage ----
FROM eclipse-temurin:8-jre
WORKDIR /app
# Copy the fat jar produced by the Maven build
COPY --from=build /app/target/spring-boot-angularjs-demo-0.0.1.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
