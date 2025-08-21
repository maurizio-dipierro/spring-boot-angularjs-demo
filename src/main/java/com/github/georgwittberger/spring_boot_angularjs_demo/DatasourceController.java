package com.github.georgwittberger.spring_boot_angularjs_demo;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/datasources")
public class DatasourceController {
    
    private final AtomicLong counter = new AtomicLong();
    private final List<Datasource> datasources = new ArrayList<Datasource>();
    
    public DatasourceController() {
        // Initialize with sample data
        datasources.add(new Datasource(counter.incrementAndGet(), "DATASOURCE_PROVA", "DATASOURCE_TEST_AUTOMATICI_BIS", "A35CDEV", "A35CDEV"));
        datasources.add(new Datasource(counter.incrementAndGet(), "MATERIAL_DS", "MaterialApp", "MATERIAL19", "Material"));
        datasources.add(new Datasource(counter.incrementAndGet(), "CLOUD_DS", "CloudApplication", "A35CDEV_CLOUD", "A35CDEV"));
        datasources.add(new Datasource(counter.incrementAndGet(), "TEST_DS", "TestApp", "A35CDEV", "A35CDEV"));
        datasources.add(new Datasource(counter.incrementAndGet(), "PROD_DS", "ProductionApp", "MATERIAL19", "Material"));
    }
    
    @RequestMapping(method = RequestMethod.GET)
    public DatasourceListResponse getDatasources(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "25") int pageSize,
            @RequestParam(required = false) String q) {
        
        List<Datasource> filtered = datasources;
        
        // Apply search filter
        if (q != null && !q.trim().isEmpty()) {
            String query = q.toLowerCase();
            filtered = new ArrayList<Datasource>();
            for (Datasource ds : datasources) {
                if (ds.getSourceName().toLowerCase().contains(query) ||
                    ds.getId().toString().contains(query) ||
                    ds.getAppName().toLowerCase().contains(query)) {
                    filtered.add(ds);
                }
            }
        }
        
        // Apply pagination
        int startIndex = (page - 1) * pageSize;
        int endIndex = Math.min(startIndex + pageSize, filtered.size());
        List<Datasource> pageItems = filtered.subList(startIndex, endIndex);
        
        return new DatasourceListResponse(pageItems, page, pageSize, filtered.size());
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Datasource getDatasource(@PathVariable Long id) {
        for (Datasource ds : datasources) {
            if (ds.getId().equals(id)) {
                return ds;
            }
        }
        throw new RuntimeException("Datasource non trovato");
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public Datasource createDatasource(@RequestBody Datasource datasource) {
        // Check for duplicate source name
        boolean exists = false;
        for (Datasource ds : datasources) {
            if (ds.getSourceName().equals(datasource.getSourceName())) {
                exists = true;
                break;
            }
        }
        
        if (exists) {
            throw new RuntimeException("NomeSorgente già esistente");
        }
        
        datasource.setId(counter.incrementAndGet());
        datasource.setSourceName(datasource.getSourceName().toUpperCase());
        datasources.add(datasource);
        return datasource;
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Datasource updateDatasource(@PathVariable Long id, @RequestBody Datasource datasource) {
        Datasource existing = null;
        for (Datasource ds : datasources) {
            if (ds.getId().equals(id)) {
                existing = ds;
                break;
            }
        }
        
        if (existing == null) {
            throw new RuntimeException("Datasource non trovato");
        }
        
        // Check for duplicate source name (excluding current record)
        boolean duplicateExists = false;
        for (Datasource ds : datasources) {
            if (!ds.getId().equals(id) && ds.getSourceName().equals(datasource.getSourceName())) {
                duplicateExists = true;
                break;
            }
        }
        
        if (duplicateExists) {
            throw new RuntimeException("NomeSorgente già esistente");
        }
        
        existing.setSourceName(datasource.getSourceName().toUpperCase());
        existing.setAppName(datasource.getAppName());
        existing.setProperty(datasource.getProperty());
        existing.setApplication(datasource.getApplication());
        
        return existing;
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteDatasource(@PathVariable Long id) {
        boolean removed = false;
        for (int i = 0; i < datasources.size(); i++) {
            if (datasources.get(i).getId().equals(id)) {
                datasources.remove(i);
                removed = true;
                break;
            }
        }
        if (!removed) {
            throw new RuntimeException("Datasource non trovato");
        }
    }
    
    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public TestResult testConnection(@RequestBody Datasource datasource) {
        // Simulate connection test
        try {
            Thread.sleep(1000); // Simulate network delay
            
            // Simple validation - in real app this would test actual connection
            if (datasource.getSourceName() != null && 
                datasource.getAppName() != null && 
                datasource.getProperty() != null && 
                datasource.getApplication() != null) {
                
                // Simulate occasional failures for demo
                if (datasource.getSourceName().contains("FAIL")) {
                    return new TestResult(false, "Connessione fallita: host non raggiungibile");
                }
                
                return new TestResult(true, null);
            } else {
                return new TestResult(false, "Parametri di connessione non validi");
            }
        } catch (InterruptedException e) {
            return new TestResult(false, "Test interrotto");
        }
    }
    
    @RequestMapping(value = "/properties", method = RequestMethod.GET)
    public List<String> getPropertyOptions() {
        return Arrays.asList("A35CDEV", "A35CDEV_CLOUD", "MATERIAL19", "PROD_ENV", "TEST_ENV");
    }
    
    @RequestMapping(value = "/applications", method = RequestMethod.GET)
    public List<String> getApplicationOptions() {
        return Arrays.asList("A35CDEV", "Material", "Production", "Testing", "Development");
    }
    
    // Helper classes
    public static class DatasourceListResponse {
        private List<Datasource> items;
        private int page;
        private int pageSize;
        private int total;
        
        public DatasourceListResponse(List<Datasource> items, int page, int pageSize, int total) {
            this.items = items;
            this.page = page;
            this.pageSize = pageSize;
            this.total = total;
        }
        
        // Getters and setters
        public List<Datasource> getItems() { return items; }
        public void setItems(List<Datasource> items) { this.items = items; }
        public int getPage() { return page; }
        public void setPage(int page) { this.page = page; }
        public int getPageSize() { return pageSize; }
        public void setPageSize(int pageSize) { this.pageSize = pageSize; }
        public int getTotal() { return total; }
        public void setTotal(int total) { this.total = total; }
    }
    
    public static class TestResult {
        private boolean ok;
        private String error;
        
        public TestResult(boolean ok, String error) {
            this.ok = ok;
            this.error = error;
        }
        
        // Getters and setters
        public boolean isOk() { return ok; }
        public void setOk(boolean ok) { this.ok = ok; }
        public String getError() { return error; }
        public void setError(String error) { this.error = error; }
    }
}