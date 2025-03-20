const express = require('express');
const School=require('../models/schoolModel')

// calculate distance  between two position.
const calculateDistanceBetween = (lat1, lon1, lat2, lon2) => {
    const convertToRadian = (value) => (value * Math.PI) / 180;
    const eartRadius = 6371; 
    const dLat =convertToRadian(lat2 - lat1);
    const dLon = convertToRadian(lon2 - lon1);
    const a =                          //a is intermediate value.
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(convertToRadian(lat1)) * Math.cos(convertToRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return eartRadius * c;
  };
  

exports.addSchool = async (req, res) => {
    
        try {
            const { name, address, latitude, longitude } = req.body;
        
            if (!name || !address || !latitude || !longitude) {
              return res.status(400).json({ message: 'Please fill all fields' });
            }
        
            const school = await School.create({ name, address, latitude, longitude });
            res.status(201).json({ message: 'School have added successfully', school });
          } catch (error) {
            res.status(500).json({ message: 'Error while adding school', error: error.message });
          }

}

exports.getSchoolList = async (req, res) => {

    try {
        const { latitude, longitude } = req.query;
    
        if (!latitude || !longitude) {
          return res.status(400).json({ message: 'Please Fill Latitude and longitude' });
        }
    
        const schools = await School.findAll();
        const sortedSchools = schools
          .map((school) => ({
            ...school.toJSON(),
            distance: calculateDistanceBetween(latitude, longitude, school.latitude, school.longitude)
          }))
          .sort((a, b) => a.distance - b.distance);
    
        res.json(sortedSchools);
      } catch (error) {
        res.status(500).json({ message: 'Error to fetch school', error: error.message });
      }
}

  
  
        


