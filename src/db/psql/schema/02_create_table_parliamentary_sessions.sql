DROP TABLE IF EXISTS parliamentary_sessions CASCADE;

CREATE OR REPLACE FUNCTION generate_uid(size INT) RETURNS TEXT AS $$
DECLARE
  characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  bytes BYTEA := gen_random_bytes(size);
  l INT := length(characters);
  i INT := 0;
  output TEXT := '';
BEGIN
  WHILE i < size LOOP
    output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN output;
END;
$$ LANGUAGE plpgsql VOLATILE;

CREATE TABLE parliamentary_sessions (
  id TEXT PRIMARY KEY DEFAULT (generate_uid(20)),
  parliament INT NOT NULL REFERENCES parliaments (number),
  number INT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON TABLE parliamentary_sessions TO commons_admin;