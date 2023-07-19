package com.ncg.backend.entities;
import jakarta.persistence.*;
@Entity
public class View {

    @Id
    @GeneratedValue
    private long id;

    private String name;
    private String chartType;
    private String country;
    private String indicator;
    private String endDate;
    private String startDate;

    public View(long id, String chartType, String country, String indicator, String endDate, String startDate) {
        super();
        this.id = id;
        this.chartType = chartType;
        this.country = country;
        this.indicator = indicator;
        this.endDate = endDate;
        this.startDate = startDate;
    }

    public View() {
        super();
        // TODO Auto-generated constructor stub
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getChartType() {
        return chartType;
    }

    public void setChartType(String chartType) {
        this.chartType = chartType;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getIndicator() {
        return indicator;
    }

    public void setIndicator(String indicator) {
        this.indicator = indicator;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
