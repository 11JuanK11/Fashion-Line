package fashion_line.app.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "products")
public class Product {
    
    @Id
    private Long id;
    private String name;
    private String size;
    private Integer price;
    private Integer stock;
    private String category;
    private String description;
}
