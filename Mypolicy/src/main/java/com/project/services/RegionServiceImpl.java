package com.project.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.daos.RegionDao;
import com.project.entities.Region;

@Transactional
@Service
public class RegionServiceImpl {

	@Autowired
	private RegionDao regionDao;
	
	public List<Region> findAllRegions() {
		List<Region> regions = regionDao.findAll();
		return regions;
	}
	
	public Region findById(int id) {
		  Region region = regionDao.findByRegionId(id);
		return region;
	}

}
