package com.project.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Region;

public interface RegionDao extends JpaRepository<Region, Integer> {

	Region findByRegionId(int id);
}
