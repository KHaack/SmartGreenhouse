package org.smartgreenhouse;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigReader {

	private static final String CONFIG_FILE = "config.properties";

	private static final String KEY_DATABASE_DRIVER = "database.driver";
	private static final String KEY_DATABASE_CONNECTIONSTRING = "database.connectionString";
	private static final String KEY_DATABASE_PASSWORD = "database.password";
	private static final String KEY_DATABASE_USER = "database.user";

	private Properties properties;

	public void init() {
		InputStream input = null;

		try {
			input = new FileInputStream(CONFIG_FILE);
			this.properties = new Properties();
			this.properties.load(input);
		} catch (IOException e) {
			throw new RuntimeException("unable to load config file", e);
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public String getDatabaseDriver() {
		return this.properties.getProperty(KEY_DATABASE_DRIVER);
	}

	public String getDatabaseConnectionString() {
		return this.properties.getProperty(KEY_DATABASE_CONNECTIONSTRING);
	}

	public String getDatabaseUser() {
		return this.properties.getProperty(KEY_DATABASE_USER);
	}

	public String getDatabasePassword() {
		return this.properties.getProperty(KEY_DATABASE_PASSWORD);
	}
}
