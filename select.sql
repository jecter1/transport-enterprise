-- 1. Получить данные об автопарке предприятия.

SELECT 
    t.brand, 
    t.model, 
    t.color, 
    t.number, 
    t.receive_date, 
    t.decommissioning_date,
    t.transport_type,
    g.location AS garage_location
FROM 
    Transport t 
    LEFT JOIN Garage_facility g ON t.garage_id = g.id
ORDER BY 
    t.decommissioning_date, 
    g.id,
    t.receive_date;


-- 2. Получить перечень и общее число водителей по предприятию, по указанной автомашине.

-- 2.1. Перечень водителей

SELECT 
    e1.name,
    e1.birth_date,
    e1.employee_type AS type,
    e1.employee_position AS position,
    e2.name AS chief_name
FROM 
    Driver d
    JOIN Employee e1 ON d.id = e1.id
    LEFT JOIN Employee e2 ON e1.chief_id = e2.id
ORDER BY
    e1.chief_id, 
    name;


-- 2.2. Число водителей

SELECT
    COUNT(*) AS driver_count
FROM
    Driver;
    

-- 2.3. Перечень водителей для указанной автомашины

SELECT 
    e1.name,
    e1.birth_date,
    e1.employee_position AS position,
    e2.name AS chief_name
FROM 
    Driver d
    JOIN Employee e1 ON d.id = e1.id
    LEFT JOIN Employee e2 ON e1.chief_id = e2.id
WHERE
    d.transport_id = 7
ORDER BY
    e1.chief_id,
    name;


-- 2.4. Число водителей для указанной автомашины

SELECT
    COUNT(*) AS driver_count
FROM
    Driver
WHERE
    transport_id = 7;


-- 3. Получить распределение водителей по автомобилям.

SELECT 
    t.number AS transport_number,
    t.brand AS transport_brand,
    t.model AS transport_model,
    t.color AS transport_color,
    t.receive_date AS transport_receive_date,
    t.decommissioning_date AS transport_decommissioning_date,
    t.transport_type AS transport_type,
    e.name,
    e.employee_position AS position
FROM 
    Driver d
    JOIN Employee e ON d.id = e.id
    LEFT JOIN Transport t ON d.transport_id = t.id
ORDER BY
    t.id;


-- 4. Получить данные о распределении пассажирского автотранспорта по маршрутам.

SELECT
    t.number,
    t.brand,
    t.model,
    t.color,
    t.receive_date,
    t.decommissioning_date,
    t.transport_type,
    pt.passenger_capacity,
    r.number AS route_number,
    r.start_point AS route_start,
    r.finish_point AS route_finish,
    rt.fare AS fare
FROM
    Route_transport rt
    JOIN Passenger_transport pt ON rt.id = pt.id
    JOIN Transport t ON rt.id = t.id
    LEFT JOIN Route r ON rt.route_id = r.id
ORDER BY
    t.id;


-- 5. Получить сведения о пробеге автотранспорта определенной категории или 
--    конкретной автомашины за указанный день, месяц, год.

-- 5.1. Для определенной категории

SELECT 
    t.number,
    t.brand,
    t.model,
    t.color,
    t.receive_date,
    t.decommissioning_date,
    ft.load_capacity,
    IFNULL(SUM(mileage), 0) AS sum_mileage
FROM
    Transport_usage tu
    JOIN Freight_transport ft ON tu.transport_id = ft.id
    JOIN Transport t ON tu.transport_id = t.id
WHERE
    (YEAR(start_datetime) = 2022 AND MONTH(start_datetime) = 4 AND DAY(start_datetime) = 6) OR
    (YEAR(end_datetime) = 2022 AND MONTH(end_datetime) = 4 AND DAY(end_datetime) = 6)
GROUP BY
    t.id;


-- 5.2. Для конкретной автомашины

SELECT 
    IFNULL(SUM(mileage), 0) AS sum_mileage
FROM
    Transport_usage
WHERE 
    ((YEAR(start_datetime) = 2022 AND MONTH(start_datetime) = 4 AND DAY(start_datetime) = 6) OR
    (YEAR(end_datetime) = 2022 AND MONTH(end_datetime) = 4 AND DAY(end_datetime) = 6)) AND
    transport_id = 3;


-- 6. Получить данные о числе ремонтов и их стоимости для автотранспорта определенной
--    категории, отдельной марки автотранспорта или указанной автомашины за указанный
--    период.

-- 6.0. Проверка

SELECT * FROM Repair;


-- 6.1. Для определенной категории

SELECT
    COUNT(*) AS repair_count,
    IFNULL(SUM(cost), 0) AS sum_cost
FROM
    Repair r
    JOIN Passenger_transport pt ON r.transport_id = pt.id
WHERE 
    start_datetime > '20210322' AND 
    end_datetime < '20220226';
    
    
-- 6.2. Для отдельной марки

SELECT
    COUNT(*) AS repair_count,
    IFNULL(SUM(cost), 0) AS sum_cost
FROM
    Repair r
    JOIN Transport t ON r.transport_id = t.id
WHERE
    t.brand LIKE 'Hyundai' AND
    start_datetime > '20210322' AND 
    end_datetime < '20220226';


-- 6.3. Для указанной автомашины

SELECT
    COUNT(*) AS repair_count,
    IFNULL(SUM(cost), 0) AS sum_cost
FROM
    Repair r
    JOIN Transport t ON r.transport_id = t.id
WHERE
    t.id = 1 AND
    start_datetime > '20210322' AND 
    end_datetime < '20220228';


-- 7. Получить данные о подчиненности персонала: 
--    рабочие - бригадиры - мастера - начальники участков и цехов.

SELECT
    e5.name AS foreman,
    e4.name AS head_of_section,
    e3.name AS master,
    e2.name AS brigade_leader,
    e1.name AS worker
FROM
    Employee e1
    JOIN Employee e2 ON e1.chief_id = e2.id
    JOIN Employee e3 ON e2.chief_id = e3.id
    JOIN Employee e4 ON e3.chief_id = e4.id
    JOIN Employee e5 ON e4.chief_id = e5.id;
    
    
-- Проверка

SELECT id, name, employee_position, chief_id FROM Employee;


-- 8. Получить сведения о наличии гаражного хозяйства 
--    в целом и по каждой категории транспорта.
-- Цех, ... доделать

-- 8.1. В целом

SELECT 
    location, 
    description 
FROM 
    Garage_facility;


-- 8.2. По категории транспорта

SELECT DISTINCT
    gf.location,
    gf.description
FROM
    Transport t
    JOIN Passenger_transport pt ON t.id = pt.id
    JOIN Garage_facility gf ON t.garage_id = gf.id;


-- 10. Получить сведения о грузоперевозках, выполненных
--     указанной автомашиной за обозначенный период.

SELECT 
    ftu.freight_volume, 
    tu.start_datetime, 
    tu.end_datetime, 
    tu.mileage
FROM 
    Freight_transport_usage ftu
    JOIN Transport_usage tu ON ftu.id = tu.id
WHERE
    ftu.transport_id = 6 AND
    tu.start_datetime > '20220404' AND
    tu.end_datetime < '20220406';


-- 11. Получить данные о числе использованных для ремонта указанных узлов и агрегатов для
--     транспорта определенной категории, отдельной марки автотранспорта или конкретной
--     автомашины за указанный период.

-- 11.0. Проверка

SELECT * FROM Repair;


-- 11.1. Для определенной категории

SELECT 
    IFNULL(COUNT(assembly), 0) AS assembly_count
FROM
    Repair r
    JOIN Passenger_transport pt ON r.transport_id = pt.id
WHERE
    NOT ((r.start_datetime < '20210320' AND r.end_datetime < '20210320') OR
         (r.start_datetime > '20220228' AND r.end_datetime > '20220228'))
    AND r.assembly LIKE 'assembly1';


-- 11.2. Для отдельной марки

SELECT 
    IFNULL(COUNT(assembly), 0) AS assembly_count
FROM
    Repair r
    JOIN Transport t ON r.transport_id = t.id
WHERE
    NOT ((r.start_datetime < '20210320' AND r.end_datetime < '20210320') OR
         (r.start_datetime > '20220228' AND r.end_datetime > '20220228'))
    AND r.assembly LIKE 'assembly1'
    AND t.brand LIKE 'Hyundai';


-- 11.3. Для конкретной автомашины

SELECT 
    IFNULL(COUNT(assembly), 0) AS assembly_count
FROM
    Repair r
WHERE
    NOT ((r.start_datetime < '20210320' AND r.end_datetime < '20210320') OR
         (r.start_datetime > '20220228' AND r.end_datetime > '20220228'))
    AND r.assembly LIKE 'assembly1'
    AND r.transport_id = 1;


-- 12. Получить сведения о полученной и списанной автотехники за указанный период.

-- 12.0. Проверка

SELECT * FROM Transport;


-- 12.1. Полученная автотехника

SELECT 
    t.brand, 
    t.model, 
    t.color, 
    t.number, 
    t.receive_date, 
    t.decommissioning_date,
    t.transport_type,
    g.location AS garage_location
FROM 
    Transport t 
    LEFT JOIN Garage_facility g ON t.garage_id = g.id
WHERE
    (receive_date > '20210427' AND receive_date < '20210701') OR
    (decommissioning_date BETWEEN '20220406' AND '20220410')
ORDER BY 
    t.decommissioning_date, 
    g.id,
    t.receive_date;
    

-- 12.2. Списанная автотехника

SELECT 
    t.brand, 
    t.model, 
    t.color, 
    t.number, 
    t.receive_date, 
    t.decommissioning_date,
    t.transport_type,
    g.location AS garage_location
FROM 
    Transport t 
    LEFT JOIN Garage_facility g ON t.garage_id = g.id
WHERE
    decommissioning_date > '20220406' AND decommissioning_date < '20220410'
ORDER BY 
    t.decommissioning_date, 
    g.id,
    t.receive_date;


-- 13. Получить состав подчиненных указанного бригадира, мастера и пр.

WITH employee_chief AS (
  SELECT
      e.id AS id,
      e.chief_id AS chief_1,
      c1.chief_id AS chief_2,
      c2.chief_id AS chief_3,
      c3.chief_id AS chief_4
  FROM
      Employee e
      LEFT JOIN Employee c1 ON c1.id = e.chief_id
      LEFT JOIN Employee c2 ON c2.id = c1.chief_id
      LEFT JOIN Employee c3 ON c3.id = c2.chief_id
)
SELECT 
    e.name,
    e.birth_date,
    e.employee_position,
    e.employee_type
FROM
    Employee e
    JOIN employee_chief ec ON e.id = ec.id
WHERE
    ec.chief_1 = 2 OR 
    ec.chief_2 = 2 OR 
    ec.chief_3 = 2 OR
    ec.chief_4 = 2;


-- Проверка

SELECT id, name, employee_type, chief_id FROM Employee;


-- 14. Получить данные о работах, выполненных указанным специалистом 
--     (сварщиком, слесарем и т.д.) за обозначенный период 
--     в целом и по конкретной автомашине.

-- 14.1. В целом

SELECT 
    t.brand AS transport_brand,
    t.model AS transport_model,
    t.color AS transport_color,
    t.number AS transport_number,
    t.transport_type,
    r.assembly,
    r.cost,
    r.start_datetime,
    r.end_datetime,
    r.description,
    gf.location
FROM 
    Repair_staff rs 
    JOIN Service_staff ss ON rs.staff_id = ss.id
    JOIN Repair r ON rs.repair_id = r.id
    LEFT JOIN Garage_facility gf ON r.garage_id = gf.id
    JOIN Transport t ON r.transport_id = t.id
WHERE 
    ss.id = 5 AND
    r.start_datetime > '20210408' AND
    r.end_datetime < '20220203';
    
    
-- 14.2. По конкретной автомашине

SELECT
    r.assembly,
    r.cost,
    r.start_datetime,
    r.end_datetime,
    r.description,
    gf.location
FROM 
    Repair_staff rs 
    JOIN Service_staff ss ON rs.staff_id = ss.id
    JOIN Repair r ON rs.repair_id = r.id
    LEFT JOIN Garage_facility gf ON r.garage_id = gf.id
WHERE 
    ss.id = 5 AND
    r.start_datetime > '20210322' AND
    r.end_datetime < '20220228' AND
    r.transport_id = 1;
