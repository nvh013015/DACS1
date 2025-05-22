CREATE DATABASE chat_app;
USE chat_app;

-- Bảng Users
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    DisplayName VARCHAR(100),
    StatusMessage VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastLoginAt TIMESTAMP NULL,
    IsOnline BOOLEAN DEFAULT FALSE
);

-- Bảng Friend (quan hệ bạn bè)
CREATE TABLE Friend (
    FriendID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    CreatAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdateAt TIMESTAMP NULL,
    FOREIGN KEY (User_ID) REFERENCES Users(UserID)
);

-- Bảng Notification
CREATE TABLE Notification (
    Notification_id INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Type VARCHAR(50),
    Title VARCHAR(255),
    IsRead BOOLEAN DEFAULT FALSE,
    CreatAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdateAt TIMESTAMP NULL,
    FOREIGN KEY (User_ID) REFERENCES Users(UserID)
);

-- Bảng Conversation
CREATE TABLE Conversation (
    Conversation_id INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    CreatAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ConversationName VARCHAR(100),
    IsGroup BOOLEAN DEFAULT FALSE,
    GroupName VARCHAR(100),
    LastMessageAt TIMESTAMP NULL,
    CreateBy INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CreateBy) REFERENCES Users(UserID)
);

-- Bảng Message
CREATE TABLE Message (
    Message_id INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Conversation_id INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Text TEXT,
    Status ENUM('Sent', 'Delivered', 'Read') DEFAULT 'Sent',
    MessageType VARCHAR(50),
    CreateBy INT,
    ReplyTo INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (Conversation_id) REFERENCES Conversation(Conversation_id),
    FOREIGN KEY (ReplyTo) REFERENCES Message(Message_id)
);

-- Bảng Participants (người tham gia cuộc trò chuyện)
CREATE TABLE Participants (
    UserID_Conversation_ID INT AUTO_INCREMENT PRIMARY KEY,
    JoinAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LeaveAt TIMESTAMP NULL,
    Role VARCHAR(50),
    UserID INT,
    Conversation_id INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (Conversation_id) REFERENCES Conversation(Conversation_id)
);