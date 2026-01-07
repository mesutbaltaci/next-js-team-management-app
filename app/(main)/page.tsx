import Link from "next/link";

const Home = async () => {
  const user = false;
  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Team Access Control
      </h1>
      <p className="text-slate-300 mb-8">This is demo showcases</p>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 p-6 border border-slate-700 rounded-lg">
          <h3 className="font-semibold mb-3 text-white">Features Demos</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>Role based access control</li>
            <li>Route protection with middleware </li>
            <li>Server side permission check</li>
            <li>Client side permission hooks</li>
            <li>Dynamic route access</li>
          </ul>
        </div>
        <div className="bg-slate-800 p-6 border border-slate-700 rounded-lg">
          <h3 className="font-semibold mb-3 text-white">User Roles</h3>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>
              <strong>Super Admin</strong> Full system access
            </li>
            <li>
              <strong>Admin</strong>User & team management
            </li>
            <li>
              <strong>Manager</strong> Team specific management
            </li>
            <li>
              <strong>User</strong> Basic Dashboard
            </li>
          </ul>
        </div>
      </div>
      {user ? (
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
          <p className="text-gray-300">
            Welcome back... <strong>Mesut</strong>! You are logged in as{" "}
            <strong className="text-gray-200">USER</strong>
          </p>
          <Link
            href="/dashboard"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white"
          >
            Go to dashboard
          </Link>
        </div>
      ) : (
        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
          <p className="text-green-300 mb-3">You are logged in</p>
          <div className=" space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-900"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 border border-late-600 text-slate-300 rounded-lg   hover:bg-blue-900"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
