package fashion_line.app.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "users")
public class UserEntity {
    
    @Id
    private Long id;
    private String nameUser;
    private String lastNameUser;
}
