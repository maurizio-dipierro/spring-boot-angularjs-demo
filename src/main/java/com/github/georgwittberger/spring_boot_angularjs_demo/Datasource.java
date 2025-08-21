package com.github.georgwittberger.spring_boot_angularjs_demo;

public class Datasource {
    private Long id;
    private String sourceName;
    private String appName;
    private String property;
    private String application;

    public Datasource() {
    }

    public Datasource(Long id, String sourceName, String appName, String property, String application) {
        this.id = id;
        this.sourceName = sourceName;
        this.appName = appName;
        this.property = property;
        this.application = application;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }
}