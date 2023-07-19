package com.ncg.backend.dao;
import com.ncg.backend.entities.View;
import jakarta.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ViewDao extends JpaRepository<View, Long> {
}
