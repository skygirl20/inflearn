package loop.ex;

public class NestedEx2 {
    public static void main(String[] args) {
        int rows = 3;
        for(int i = 1;i <= rows; i++){    // i = 1;
            for(int j = 1;j <= i; j++){   // i = 1, j = 1    // i = 1, j = 2
                System.out.print("*");
            }
            System.out.print("\n");
        }
    }
}
