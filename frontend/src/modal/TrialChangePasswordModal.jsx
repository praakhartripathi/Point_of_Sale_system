import React, {useState} from "react";
import {TRIAL_CHANGE_PASSWORD_URL} from "../api/endpoints";

const TrialChangePasswordModal = ({isOpen, onClose}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters long");
            return;
        }
        if (newPassword !== confirmPassword) {
            if (newPassword.toLowerCase() === confirmPassword.toLowerCase()) {
                setError("New passwords do not match (Case Mismatch - Check Caps Lock)");
            } else {
                setError("New passwords do not match");
            }
            return;
        }
        if (currentPassword === newPassword) {
            setError("New password must be different from current password");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token")?.trim();

            if (!token) throw new Error("Not authenticated. Please login again.");

            const response = await fetch(TRIAL_CHANGE_PASSWORD_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    confirmNewPassword: confirmPassword,
                }),


            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to change password");
            }

            console.log("Password changed successfully");
            alert("Password changed successfully!");
            onClose();
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(err.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Change Password</h3>
                    <button onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <X className="w-5 h-5"/>
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    {error && (
                        <div
                            className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}
                    <PasswordField
                        label="Current Password"
                        value={currentPassword}
                        onChange={setCurrentPassword}
                        show={showCurrentPassword}
                        onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
                    />
                    <PasswordField
                        label="New Password"
                        value={newPassword}
                        onChange={setNewPassword}
                        show={showNewPassword}
                        onToggle={() => setShowNewPassword(!showNewPassword)}
                        placeholder="Min 6 characters"
                    />
                    <PasswordField
                        label="Confirm New Password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        show={showConfirmPassword}
                        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">Cancel
                        </button>
                        <button type="button" onClick={handleChangePassword} disabled={loading}
                                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-70">
                            {loading ? "Changing..." : "Change Password"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PasswordField = ({label, value, onChange, show, onToggle, placeholder}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <div
            className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <Lock className="w-4 h-4 text-gray-400"/>
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
                className="bg-transparent w-full outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-400"
                required
            />
            <button type="button" onClick={onToggle}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                {show ? "🙈" : "👁"}
            </button>
        </div>
    </div>
);

const Lock = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
</svg>;
const X = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
</svg>;

export default TrialChangePasswordModal;
