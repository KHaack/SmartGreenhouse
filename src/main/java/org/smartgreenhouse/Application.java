package org.smartgreenhouse;

import java.sql.SQLException;
import java.util.List;

import org.smartgreenhouse.Lib.DatabaseConfig;
import org.smartgreenhouse.Lib.GreenhouseDatabase;
import org.smartgreenhouse.Lib.SampleAverage;
import org.smartgreenhouse.Lib.Models.Sensor;
import org.smartgreenhouse.Lib.Models.Sample;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ComponentScan
@EnableAutoConfiguration
public class Application {

	@RequestMapping("/getSensor")
	public Sensor getSensor(int id)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		DatabaseConfig config = new DatabaseConfig();
		config.init();
		GreenhouseDatabase database = new GreenhouseDatabase(config);
		database.connect();

		return database.getSensor(id);
	}

	@RequestMapping("/getSensors")
	public List<Sensor> getSensors()
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		DatabaseConfig config = new DatabaseConfig();
		config.init();
		GreenhouseDatabase database = new GreenhouseDatabase(config);
		database.connect();

		return database.getSensors();
	}

	@RequestMapping("/getSamples")
	public List<Sample> getSensorData(int sensorId, String sampleAverage, int limit)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		DatabaseConfig config = new DatabaseConfig();
		config.init();
		GreenhouseDatabase database = new GreenhouseDatabase(config);
		database.connect();

		switch (sampleAverage) {
		case "hour":
			return database.getSamples(sensorId, SampleAverage.hour, limit);
		default:
		case "minute":
			return database.getSamples(sensorId, SampleAverage.minute, limit);
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}