package scope;

public class Scope2 {
    public static void main(String[] args) {
        int m = 10; // m 생존 시작
        for (int i = 0; i < 2;i++){
            System.out.println("if m = " + m);
            System.out.println("if i = " + i);
        }
        // i 생존 종료
        System.out.println("main m = " + m);
        //System.out.println("main i = " + i); // i접근 불가
    }
}
