package method.ex;

public class MethodEx2Ref {
    public static void main(String[] args) {
        String message = "Hello, world!";

        print(message, 3);
        print(message, 5);
        print(message, 7);

    }

    public static void print(String message, int count){
        for(int i = 0; i < count; i++){
            System.out.println(message);
        }
    }
}
