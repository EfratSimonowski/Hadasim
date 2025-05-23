USE FamilyTrie;
CREATE TABLE Individuals (
    Person_Id INT PRIMARY KEY,
    Personal_Name VARCHAR(100),
    Family_Name VARCHAR(100),
    Gender VARCHAR(10),
    Father_Id INT,
    Mother_Id INT,
    Spouse_Id INT
);

CREATE TABLE Relations (
    Person_Id INT,
    Relative_Id INT,
    Connection_Type VARCHAR(50),
    FOREIGN KEY (Person_Id) REFERENCES Individuals(Person_Id),
    FOREIGN KEY (Relative_Id) REFERENCES Individuals(Person_Id)
);
INSERT INTO Individuals (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES
(1, 'יוסי', 'כהן', 'בן', NULL, NULL, 2),
(2, 'שרה', 'כהן', 'בת', NULL, NULL, 1),
(3, 'דנה', 'כהן', 'בת', 1, 2, 4),
(4, 'אורי', 'לוי', 'בן', NULL, NULL, NULL),
(5, 'נועם', 'כהן', 'בן', 1, 2, NULL);


INSERT INTO Relations (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Father_Id, 'אב' FROM Individuals WHERE Father_Id IS NOT NULL
UNION
SELECT Person_Id, Mother_Id, 'אם' FROM Individuals WHERE Mother_Id IS NOT NULL;


INSERT INTO Relations (Person_Id, Relative_Id, Connection_Type)
SELECT Father_Id, Person_Id,
       CASE Gender WHEN 'בן' THEN 'בן' ELSE 'בת' END
FROM Individuals WHERE Father_Id IS NOT NULL
UNION
SELECT Mother_Id, Person_Id,
       CASE Gender WHEN 'בן' THEN 'בן' ELSE 'בת' END
FROM Individuals WHERE Mother_Id IS NOT NULL;


INSERT INTO Relations (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Spouse_Id,
       CASE Gender WHEN 'בן' THEN 'בת זוג' ELSE 'בן זוג' END
FROM Individuals WHERE Spouse_Id IS NOT NULL;


INSERT INTO Relations (Person_Id, Relative_Id, Connection_Type)
SELECT A.Person_Id, B.Person_Id,
       CASE B.Gender WHEN 'בן' THEN 'אח' ELSE 'אחות' END
FROM Individuals A
JOIN Individuals B ON A.Father_Id = B.Father_Id AND A.Mother_Id = B.Mother_Id
WHERE A.Person_Id <> B.Person_Id;


INSERT INTO Relations (Person_Id, Relative_Id, Connection_Type)
SELECT
    B.Spouse_Id AS Person_Id,
    B.Person_Id AS Relative_Id,
    CASE B.Gender
        WHEN 'בן' THEN 'בת זוג'
        ELSE 'בן זוג'
    END AS Connection_Type
FROM Individuals B
LEFT JOIN Relations R
    ON R.Person_Id = B.Spouse_Id AND R.Relative_Id = B.Person_Id
WHERE B.Spouse_Id IS NOT NULL
  AND R.Person_Id IS NULL;




