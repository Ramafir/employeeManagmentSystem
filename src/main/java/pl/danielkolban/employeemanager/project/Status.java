package pl.danielkolban.employeemanager.project;

public enum Status {
    COMPLETED("COMPLETED"),
    IN_PROGRESS("IN_PROGRESS");

    private final String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }
}