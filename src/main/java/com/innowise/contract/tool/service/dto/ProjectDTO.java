package com.innowise.contract.tool.service.dto;

import com.innowise.contract.tool.domain.enumeration.LifecycleStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.innowise.contract.tool.domain.Project} entity.
 */
@Schema(description = "Projects")
public class ProjectDTO implements Serializable {

    private Long id;

    /**
     * Название проекта
     */
    @NotNull(message = "must not be null")
    @Schema(description = "Название проекта", required = true)
    private String name;

    /**
     * Дата начала
     */
    @NotNull(message = "must not be null")
    @Schema(description = "Дата начала", required = true)
    private LocalDate startDate;

    /**
     * Дата окончания
     */
    @Schema(description = "Дата окончания")
    private LocalDate finishDate;

    /**
     * Ссылка
     */
    @Schema(description = "Ссылка")
    private String link;

    /**
     * Статус дикшинари
     */
    @Schema(description = "Статус дикшинари")
    private String statusId;

    /**
     * Актуальный или удаленный
     */
    @Schema(description = "Актуальный или удаленный")
    private LifecycleStatus lifecycleStatus;

    private ClientDTO client;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getStatusId() {
        return statusId;
    }

    public void setStatusId(String statusId) {
        this.statusId = statusId;
    }

    public LifecycleStatus getLifecycleStatus() {
        return lifecycleStatus;
    }

    public void setLifecycleStatus(LifecycleStatus lifecycleStatus) {
        this.lifecycleStatus = lifecycleStatus;
    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectDTO)) {
            return false;
        }

        ProjectDTO projectDTO = (ProjectDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, projectDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", link='" + getLink() + "'" +
            ", statusId='" + getStatusId() + "'" +
            ", lifecycleStatus='" + getLifecycleStatus() + "'" +
            ", client=" + getClient() +
            "}";
    }
}
