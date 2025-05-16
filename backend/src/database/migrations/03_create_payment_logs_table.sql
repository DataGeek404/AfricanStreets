
CREATE TABLE IF NOT EXISTS payment_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  payment_provider VARCHAR(50) NOT NULL,
  payment_id VARCHAR(255),
  donation_id INT,
  request_data JSON,
  response_data JSON,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE SET NULL,
  
  INDEX idx_payment_provider (payment_provider),
  INDEX idx_payment_id (payment_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
