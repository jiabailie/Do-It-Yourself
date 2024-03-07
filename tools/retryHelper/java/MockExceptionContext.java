package tools.retryHelper.java;

import org.opensearch.http.HttpException;

public class MockExceptionContext {
    private static MockExceptionContext instance = null;
    private MockExceptionContext() {}
    public static MockExceptionContext getInstance() {
        if (instance == null) {
            instance = new MockExceptionContext();
        }
        return instance;
    }
    public int multiply(final int num) {
        return 10 * num;
    }

    public int multiplyWithNot502Exception(final int num) throws IllegalArgumentException {
        throw new IllegalArgumentException("IllegalArgumentException");
    }

    public void dummy(final int num) {
        // do nothing
    }
}
